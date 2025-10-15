// src/test/setupTests.js
process.env.TZ = "UTC"; // fige le TZ pour des snapshots stables
import "@testing-library/jest-dom/vitest";
