import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1000,
  duration: "5s",
};

const BASE_URL = __ENV.BASE_URL;

export default function () {
  const response = http.get(BASE_URL);

  check(response, {
    "status was 200": (r) => r.status === 200,
  });

  sleep(1);
}
