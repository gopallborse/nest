import { Controller, Get } from "@nestjs/common";

@Controller("/abc")
export class AppController {
  @Get("/hello")
  getRootRoute() {
    return "Hello World!";
  }

  @Get("/bye")
  getByeThere() {
    return "Bye World!";
  }
}
