#!/usr/bin/env tsx
/**
 * Script to ingest resume data into the vector database
 * Run with: npm run ingest-resume
 */

import { config } from "dotenv";
import { storage } from "../storage";
import { openai } from "../lib/openai";
import { resumeData } from "../data/resume";

// Load environment variables
config();

async function ingestResume() {
  console.log("🚀 Starting resume data ingestion...");
  console.log(`📄 Total items to process: ${resumeData.length}`);

  try {
    // Clear existing documents
    console.log("🗑️  Clearing existing documents...");
    await storage.clearDocuments();

    let successCount = 0;
    let failCount = 0;

    // Process each resume item
    for (let i = 0; i < resumeData.length; i++) {
      const item = resumeData[i];
      try {
        console.log(`\n[${i + 1}/${resumeData.length}] Processing: ${item.title}`);
        
        // Generate embedding
        const embedding = await openai.getEmbedding(item.content);
        
        // Insert into database
        await storage.insertDocument({
          ...item,
          embedding,
          metadata: {}
        });
        
        successCount++;
        console.log(`✅ Success`);
      } catch (error) {
        failCount++;
        console.error(`❌ Failed to ingest "${item.title}":`, error);
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("📊 Ingestion Summary:");
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📈 Total: ${resumeData.length}`);
    console.log("=".repeat(50));

    if (successCount > 0) {
      console.log("\n🎉 Resume data successfully ingested into vector database!");
      console.log("💬 Your chatbot is now ready to answer questions about your experience.");
    }

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Fatal error during ingestion:", error);
    process.exit(1);
  }
}

// Run the ingestion
ingestResume();
