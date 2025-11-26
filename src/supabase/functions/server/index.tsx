import { Hono } from "npm:hono@4";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", cors());
app.use("*", logger(console.log));

// Endpoint для сохранения заявок
app.post("/make-server-4fefa63c/applications", async (c) => {
  try {
    const body = await c.req.json();
    const { name, status, message, contact } = body;

    if (!name || !status || !message || !contact) {
      return c.json({ error: "Все поля обязательны для заполнения" }, 400);
    }

    // Создаем уникальный ключ для заявки
    const applicationId = `application_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Сохраняем заявку в KV store
    const applicationData = {
      id: applicationId,
      name,
      status,
      message,
      contact,
      createdAt: new Date().toISOString(),
      processed: false,
    };

    await kv.set(applicationId, applicationData);

    console.log(`Новая заявка сохранена: ${applicationId} от ${name}`);

    return c.json({ 
      success: true, 
      message: "Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.",
      applicationId 
    }, 201);
  } catch (error) {
    console.error("Ошибка при сохранении заявки:", error);
    return c.json({ error: "Ошибка сервера при обработке заявки" }, 500);
  }
});

// Endpoint для получения всех заявок (для администраторов)
app.get("/make-server-4fefa63c/applications", async (c) => {
  try {
    const applications = await kv.getByPrefix("application_");
    
    // Сортируем по дате создания (новые сначала)
    const sortedApplications = applications.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ 
      success: true, 
      applications: sortedApplications,
      total: sortedApplications.length 
    });
  } catch (error) {
    console.error("Ошибка при получении заявок:", error);
    return c.json({ error: "Ошибка сервера при получении заявок" }, 500);
  }
});

// Health check endpoint
app.get("/make-server-4fefa63c/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
