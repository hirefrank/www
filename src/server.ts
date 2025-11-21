/**
 * Custom Cloudflare Workers Entry Point
 *
 * This file provides a custom server entry point for TanStack Start on Cloudflare Workers.
 * By using a custom entry point instead of "@tanstack/react-start/server-entry", we can
 * extend our Worker with additional handlers for background jobs, scheduled tasks, and more.
 *
 * Features enabled by custom entry point:
 * - Queue consumers for background job processing
 * - Scheduled/Cron handlers for periodic tasks
 * - Durable Objects integration
 * - Custom middleware and request handling logic
 */

import handler from "@tanstack/react-start/server-entry";

console.log("[server-entry]: using custom server entry in 'src/server.ts'");

/**
 * Cloudflare Workers Export Object
 *
 * The export default object defines handlers for different event types.
 * Currently implements fetch() for HTTP requests, with working examples
 * for queue() and scheduled() handlers that can be uncommented as needed.
 */
export default {
  /**
   * Fetch Handler
   *
   * Handles all incoming HTTP requests by delegating to TanStack Start's handler.
   * This maintains full compatibility with TanStack Start routing and SSR.
   *
   * @param request - The incoming HTTP request
   * @param env - Environment bindings (D1, KV, R2, etc.)
   * @param ctx - Execution context for waitUntil() and passThroughOnException()
   */
  async fetch(request: Request, env: any, _ctx: ExecutionContext): Promise<Response> {
    // Delegate to TanStack Start handler
    return handler.fetch(request, env);
  },

  /**
   * Queue Handler
   *
   * Processes messages from Cloudflare Queues for background job processing.
   * This example shows how to handle different message types for various async tasks.
   *
   * TO ENABLE THIS HANDLER:
   * 1. Create a queue: `wrangler queues create app-queue`
   * 2. Add to wrangler.jsonc:
   *    ```jsonc
   *    "queues": {
   *      "producers": [{ "binding": "APP_QUEUE", "queue": "app-queue" }],
   *      "consumers": [{ "queue": "app-queue", "max_batch_size": 10, "max_batch_timeout": 30 }]
   *    }
   *    ```
   * 3. Uncomment this handler
   * 4. Send messages: `await env.APP_QUEUE.send({ type: 'email', ... })`
   *
   * Example message types:
   * - { type: 'email', to: 'user@example.com', subject: '...', body: '...' }
   * - { type: 'process_upload', fileId: 'abc123' }
   * - { type: 'update_stats', userId: 'user123' }
   */
  // async queue(batch: MessageBatch, env: any, ctx: ExecutionContext): Promise<void> {
  //   console.log(`Processing ${batch.messages.length} messages from queue`);
  //
  //   for (const message of batch.messages) {
  //     try {
  //       const body = message.body as any;
  //       console.log(`Processing message ${message.id} of type: ${body.type}`);
  //
  //       // Route to appropriate handler based on message type
  //       switch (body.type) {
  //         case 'email':
  //           await handleEmailJob(body, env);
  //           break;
  //
  //         case 'process_upload':
  //           await handleFileProcessing(body, env);
  //           break;
  //
  //         case 'update_stats':
  //           await handleStatsUpdate(body, env);
  //           break;
  //
  //         default:
  //           console.warn(`Unknown message type: ${body.type}`);
  //       }
  //
  //       // Acknowledge successful processing
  //       message.ack();
  //     } catch (error) {
  //       console.error(`Failed to process message ${message.id}:`, error);
  //       // Message will be retried automatically if not acked
  //       // Optionally call message.retry({ delaySeconds: 60 }) for custom retry delay
  //       message.retry();
  //     }
  //   }
  // },

  /**
   * Scheduled Handler (Cron Jobs)
   *
   * Responds to Cron Triggers for periodic tasks and scheduled jobs.
   * This example shows daily cleanup and hourly stats aggregation.
   *
   * TO ENABLE THIS HANDLER:
   * 1. Add cron triggers to wrangler.jsonc:
   *    ```jsonc
   *    "triggers": {
   *      "crons": [
   *        "0 0 * * *",      // Daily at midnight UTC
   *        "0 * * * *"       // Hourly
   *      ]
   *    }
   *    ```
   * 2. Uncomment this handler
   * 3. Test locally: `curl "http://localhost:8787/__scheduled?cron=0+0+*+*+*"`
   *
   * Common cron patterns:
   * - Daily at midnight: "0 0 * * *"
   * - Every hour: "0 * * * *"
   * - Every 15 minutes: "* /15 * * * *"
   * - Weekly on Monday: "0 0 * * 1"
   */
  // async scheduled(controller: ScheduledController, env: any, ctx: ExecutionContext): Promise<void> {
  //   const cron = controller.cron;
  //   const scheduledTime = new Date(controller.scheduledTime);
  //
  //   console.log(`Cron job triggered: ${cron} at ${scheduledTime.toISOString()}`);
  //
  //   // Use ctx.waitUntil() to run async operations that should complete
  //   // even after the handler returns
  //   ctx.waitUntil(
  //     (async () => {
  //       try {
  //         // Route to appropriate job based on cron pattern
  //         if (cron === '0 0 * * *') {
  //           // Daily job - cleanup old data
  //           await runDailyCleanup(env);
  //         } else if (cron === '0 * * * *') {
  //           // Hourly job - aggregate stats
  //           await runHourlyStatsAggregation(env);
  //         }
  //
  //         console.log(`Cron job completed: ${cron}`);
  //       } catch (error) {
  //         console.error(`Cron job failed: ${cron}`, error);
  //         // Consider sending alerts for failed scheduled jobs
  //       }
  //     })()
  //   );
  // },
};

// =============================================================================
// Background Job Handlers (for Queue)
// =============================================================================

/**
 * Handle email sending jobs
 */
// async function handleEmailJob(
//   message: { to: string; subject: string; body: string },
//   env: any
// ): Promise<void> {
//   console.log(`Sending email to ${message.to}`);
//   // Integrate with Resend, SendGrid, or your email provider
//   // Example: await env.RESEND.send({ to: message.to, ... })
// }

/**
 * Handle file processing jobs
 */
// async function handleFileProcessing(
//   message: { fileId: string },
//   env: any
// ): Promise<void> {
//   console.log(`Processing file: ${message.fileId}`);
//   // Fetch file from R2, process it, store results
//   // Example: const file = await env.R2_BUCKET.get(message.fileId)
// }

/**
 * Handle stats update jobs
 */
// async function handleStatsUpdate(
//   message: { userId: string },
//   env: any
// ): Promise<void> {
//   console.log(`Updating stats for user: ${message.userId}`);
//   // Update aggregated statistics in D1 or KV
//   // Example: await env.DB.prepare('UPDATE ...').run()
// }

// =============================================================================
// Scheduled Job Handlers (for Cron)
// =============================================================================

/**
 * Daily cleanup job
 * Runs at midnight UTC to clean up old data
 */
// async function runDailyCleanup(env: any): Promise<void> {
//   console.log('Running daily cleanup...');
//
//   // Example: Delete posts older than 1 year with status 'archived'
//   // const db = env.DB;
//   // const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
//   // await db
//   //   .prepare('DELETE FROM Post WHERE status = ? AND createdAt < ?')
//   //   .bind('archived', oneYearAgo)
//   //   .run();
//
//   console.log('Daily cleanup completed');
// }

/**
 * Hourly stats aggregation
 * Runs every hour to aggregate metrics
 */
// async function runHourlyStatsAggregation(env: any): Promise<void> {
//   console.log('Running hourly stats aggregation...');
//
//   // Example: Calculate and cache popular posts
//   // const db = env.DB;
//   // const popularPosts = await db
//   //   .prepare('SELECT id, title, viewCount FROM Post ORDER BY viewCount DESC LIMIT 10')
//   //   .all();
//   //
//   // await env.KV.put('popular_posts', JSON.stringify(popularPosts), {
//   //   expirationTtl: 3600 // 1 hour
//   // });
//
//   console.log('Hourly stats aggregation completed');
// }

/**
 * DURABLE OBJECTS EXAMPLE
 *
 * Durable Objects provide strongly consistent coordination and storage.
 * Useful for: real-time collaboration, counters, rate limiting, WebSocket rooms.
 *
 * TO ADD A DURABLE OBJECT:
 * 1. Create a class that extends DurableObject (see example below)
 * 2. Export the class from this file
 * 3. Add to wrangler.jsonc:
 *    ```jsonc
 *    "durable_objects": {
 *      "bindings": [
 *        {
 *          "name": "VIEW_COUNTER",
 *          "class_name": "ViewCounter",
 *          "script_name": "tanstack-start-cloudflare-starter"
 *        }
 *      ]
 *    },
 *    "migrations": [
 *      { "tag": "v1", "new_classes": ["ViewCounter"] }
 *    ]
 *    ```
 * 4. Access in server functions: `const id = env.VIEW_COUNTER.idFromName('post:123')`
 *
 * Example: View Counter Durable Object
 */

/**
 * ViewCounter Durable Object
 *
 * Maintains a persistent counter for page views with atomic increments.
 * Each instance is identified by a unique ID (e.g., post:123).
 */
// export class ViewCounter {
//   private state: DurableObjectState;
//   private count: number = 0;
//
//   constructor(state: DurableObjectState, env: any) {
//     this.state = state;
//   }
//
//   async fetch(request: Request): Promise<Response> {
//     // Load count from storage on first access
//     if (this.count === 0) {
//       this.count = (await this.state.storage.get<number>('count')) || 0;
//     }
//
//     const url = new URL(request.url);
//
//     if (request.method === 'POST' && url.pathname === '/increment') {
//       // Atomic increment
//       this.count++;
//       await this.state.storage.put('count', this.count);
//       return Response.json({ count: this.count });
//     }
//
//     if (request.method === 'GET' && url.pathname === '/count') {
//       // Get current count
//       return Response.json({ count: this.count });
//     }
//
//     return new Response('Not found', { status: 404 });
//   }
// }
