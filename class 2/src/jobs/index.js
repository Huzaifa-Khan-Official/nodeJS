import { dummyJob1 } from "./dummy1.job.js";
import { dummyJob2 } from "./dummy2.job.js";

const cronManager = new Map();

cronManager.set("dummyJob1", dummyJob1);
cronManager.set("dummyJob2", dummyJob2);

export { cronManager };