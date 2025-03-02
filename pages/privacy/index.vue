<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Privacy Policy</h1>
    <MarkdownRenderer :content="privacyContent" />
  </div>
</template>

<script setup lang="ts">
import MarkdownRenderer from "~/components/MarkdownRenderer.vue";

const privacyContent = `
**Effective Date:** 2025-03-02

## Introduction

This Privacy Policy explains how ExziSoft ("we", "us", or "our") collects, uses, and discloses information about you when you visit our website [Your Website URL] (the "Site") or use our services (the "Services").

## Information We Collect

We may collect the following types of information:

1. **Personal Information:**
   - Name
   - Email address
   - Phone number
   - Any other information you provide to us directly

2. **Usage Data:**
   - Information about how you use our Site and Services, including your IP address, browser type, pages visited, and time spent on those pages.

## How We Use Your Information

We may use the information we collect for various purposes, including to:
- Provide, maintain, and improve our Site and Services
- Communicate with you, including responding to your inquiries
- Monitor the usage of our Site and Services
- Detect, prevent, and address technical issues
- Comply with legal obligations

## Disclosure of Your Information

We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:
- With service providers who assist us in operating our Site and Services
- To comply with legal obligations or respond to legal requests
- To protect the rights and safety of our users and the public

## Security of Your Information

We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is 100% secure.

## Your Rights

Depending on your location, you may have the following rights regarding your personal information:
- The right to access your personal information
- The right to request correction of your personal information
- The right to request deletion of your personal information

## Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## Contact Us

If you have any questions about this Privacy Policy, please contact us at:
- Email: tom.rogiers@gmail.com


`;
</script>

<style scoped>
/* Add any necessary styles here */
</style>
