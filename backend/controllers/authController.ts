import { NextResponse } from "next/server";
import * as authService from "../services/authService";

export async function login(req: Request) {
  const body = await req.json();
  const result = await authService.login(body);
  return NextResponse.json(result);
}

export async function register(req: Request) {
  const body = await req.json();
  const result = await authService.register(body);
  return NextResponse.json(result);
}
