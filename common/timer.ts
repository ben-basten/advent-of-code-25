type Result = { time: number; label: string | undefined };

let startTime: number | undefined;
let label: string | undefined;
const results: Result[] = [];

function start(text?: string) {
  startTime = performance.now();
  label = text;
}

function stop() {
  const endTime = performance.now();
  if (startTime) {
    results.push({ time: endTime - startTime, label });
  }
  startTime = undefined;
  label = undefined;
}

function print() {
  const result = results.shift();
  logResult(result);
}

function printAll() {
  results.forEach((result) => {
    logResult(result);
  });
}

function logResult(result: Result | undefined) {
  if (!result) {
    return;
  }

  const trimmedTime = result.time.toPrecision(10);
  const message = result.label
    ? `${trimmedTime}ms (${result.label})`
    : `${trimmedTime}ms`;
  console.log(message);
}

const timer = {
  start,
  stop,
  print,
  printAll,
};

export default timer;
