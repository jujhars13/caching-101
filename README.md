# caching 101 demo

Quick and dirty express.js server to demo caching basics
Caches to disk to show performance difference.

## Why cache

- speed

## things to cache

- databases
- cdn
- dns (resolver vs authorititave)
- application
- web

## types of cache

- disk based
- memory based
- disk + memory

## to run

```bash

npm install

node index.js

## load test using apache-bench (apt-get install apache2-utils)
ab -n 100 localhost:3000/

## check the speed difference
ab -n 100 localhost:3000/cached
```