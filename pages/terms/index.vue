<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">{{ $t("legal.terms.title") }}</h1>
    <MarkdownRenderer :content="termsContent" />
  </div>
</template>

<script setup lang="ts">
import MarkdownRenderer from "~/components/MarkdownRenderer.vue";
const { t, locale } = useI18n();

// You could have different markdown content per language
// For now we're using the same content with translated title
const termsContent = `
**${t("legal.terms.effective")}:** 2025-03-02

## Introduction

These Terms of Service ("Terms") govern your access to and use of the services provided by ExziSoft ("we", "us", or "our") through our website [Your Website URL] (the "Site"). By using our Site and Services, you agree to these Terms.

## Services

We provide web development, app development, backend development, and more.

## User Responsibilities

You agree to:
- Provide accurate and complete information when using our Services
- Use our Services only for lawful purposes
- Not engage in any activity that may harm our Site or Services

## Payment Terms

[Include your payment terms, e.g., payment methods, due dates, late fees, etc.]

## Intellectual Property

All content, trademarks, and other intellectual property on our Site and Services are owned by us or our licensors. You may not use, reproduce, or distribute any content without our prior written consent.

## Limitation of Liability

To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Site or Services.

## Changes to These Terms

We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page.

## Governing Law

These Terms shall be governed by and construed in accordance with the laws of Belgium.

## Contact Us

If you have any questions about these Terms, please contact us at:

- Email: tom.rogiers@gmail.com

`;

// Set the page metadata with correct language
useHead({
  title: `${t("legal.terms.title")} | Tom Rogiers`,
  meta: [
    {
      name: "description",
      content: `${t("legal.terms.title")} for Tom Rogiers' portfolio website`,
    },
  ],
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>
