// Konstanta yang dipakai bersama oleh client DAN server.
// Import dari sini supaya tidak ada versi dobel yang bisa berbeda.
export const MAX_KUOTA = 2500;

// Regex nomor WhatsApp Indonesia: 08xx / 628xx / +628xx, 10-14 digit total
export const PHONE_REGEX = /^(\+62|62|0)8\d{7,11}$/;