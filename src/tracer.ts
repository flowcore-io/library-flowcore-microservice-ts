import tracer from "dd-trace";

// initialized in a different file to avoid hoisting.
tracer.init({
  logInjection: true,
});

export default tracer;
