# Python Async Functions

This project practices Python asynchronous programming using `asyncio`, including:
- writing coroutines (`async def`)
- running multiple coroutines concurrently
- collecting results from concurrent tasks
- measuring runtime
- creating and managing `asyncio.Task` objects

---

## Files and Requirements

- Python 3
- Uses the standard libraries:
  - `asyncio`
  - `random`
  - `time`
  - `typing` (optional but recommended)

---

## 0-basic_async_syntax.py — `wait_random`

### Goal
Write an asynchronous coroutine named `wait_random` that:
- takes an integer `max_delay` (default `10`)
- waits for a random delay between `0` and `max_delay` seconds (random **float**)
- returns the delay value (float)

### Key ideas
- Use `random.uniform(0, max_delay)` to generate a float delay.
- Use `await asyncio.sleep(delay)` to wait asynchronously.

---

## 1-concurrent_coroutines.py — `wait_n`

### Goal
Write an async routine named `wait_n` that:
- imports `wait_random` from `0-basic_async_syntax`
- takes two integers: `n` and `max_delay`
- spawns `wait_random(max_delay)` exactly `n` times (concurrently)
- returns a list of all delays (floats) **in ascending order**
- must not use `sort()` to order the list (ordering should happen naturally due to concurrency)

### Key ideas
- Create a list of coroutines (or tasks) and run them concurrently.
- Use `asyncio.as_completed(...)` to collect results in the order they finish.
  - Faster delays finish first → results naturally come out sorted ascending.

---

## 2-measure_runtime.py — `measure_time`

### Goal
Write a function `measure_time` (regular function, not async) that:
- imports `wait_n` from `1-concurrent_coroutines`
- takes integers `n` and `max_delay`
- measures total runtime for `wait_n(n, max_delay)`
- returns the average runtime per coroutine: `total_time / n` as a float
- uses the `time` module for approximate elapsed time

### Key ideas
- Use `time.time()` before and after running the event loop.
- Use `asyncio.run(wait_n(n, max_delay))` inside `measure_time`.

---

## 3-tasks.py — `task_wait_random`

### Goal
Write a function (NOT async) named `task_wait_random` that:
- imports `wait_random` from `0-basic_async_syntax`
- takes an integer `max_delay`
- returns an `asyncio.Task`

### Key ideas
- A Task schedules a coroutine to run concurrently.
- Use `asyncio.create_task(wait_random(max_delay))` to create and return the task.

---

## 4-tasks.py — `task_wait_n`

### Goal
Write an async routine `task_wait_n` that:
- is based on the logic of `wait_n`
- but uses `task_wait_random` instead of calling `wait_random` directly
- spawns `n` tasks with the given `max_delay`
- returns the list of delays in ascending order (without using `sort()`)

### Key ideas
- Create `n` tasks using `task_wait_random(max_delay)`.
- Collect results using `asyncio.as_completed(...)` to preserve “finish order” (ascending delays).

---

## Summary of Functions

- `wait_random(max_delay=10) -> float`  
  Waits random time and returns it.

- `wait_n(n, max_delay) -> List[float]`  
  Runs `wait_random` concurrently `n` times and returns delays ascending.

- `measure_time(n, max_delay) -> float`  
  Measures average runtime per coroutine.

- `task_wait_random(max_delay) -> asyncio.Task`  
  Returns a scheduled Task running `wait_random`.

- `task_wait_n(n, max_delay) -> List[float]`  
  Like `wait_n`, but uses Tasks.

---
