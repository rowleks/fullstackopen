const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/reset");
    await request.post("/api/users", {
      data: {
        name: "Rowland Momoh",
        username: "Rolex",
        password: "Rolex10",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText(/bloglist/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();
      await page.getByLabel("Username:").fill("Rolex");
      await page.getByLabel("Password:").fill("Rolex10");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.getByText(/welcome rolex/i)).toBeVisible();
    });

    test("fails with incorrect credentials", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();
      await page.getByLabel("Username:").fill("Rolex");
      await page.getByLabel("Password:").fill("Password");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator(".error")).toContainText(
        /incorrect username or password/i
      );
      await expect(page.getByText(/welcome rolex/i)).not.toBeVisible();
    });
  });
});
