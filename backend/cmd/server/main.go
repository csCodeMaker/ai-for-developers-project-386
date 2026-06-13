package main

import (
	"log"
	"net/http"

	"booking-backend/internal/config"
	"booking-backend/internal/server"
	"booking-backend/internal/store"
)

func main() {
	cfg := config.Load()
	st := store.New()
	h := server.NewHandler(st, cfg)

	addr := ":" + cfg.Port
	log.Printf("Календарь звонков — бэкенд запущен на %s", addr)

	if err := http.ListenAndServe(addr, h.Routes()); err != nil {
		log.Fatalf("ошибка сервера: %v", err)
	}
}
