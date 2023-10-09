package main

import (
	"context"
	"encoding/json"
	"fmt"
	"load-tester/functions"
	"log"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) TestWailsNet() []byte {
	// return functions.DdosAttack()

	// time.Sleep(5 * time.Second)
	// return fmt.Sprintf("%d", functions.DdosAttack())
	return functions.List()
	// return fmt.Sprintf("Hello %s, It's show time!", url)
}

func (a *App) ConnectToRedisDB(host string, port string, password string, username string, databaseAlias string) {

	login := &functions.RedisLogin{
		Host:          host,
		Port:          port,
		Password:      password,
		Username:      username,
		DatabaseAlias: databaseAlias,
	}
	functions.ConnectToRedis(login)
	// fmt.Println("Connect to redis: ", name)
}

func (a *App) ReadDBCredentials() []byte {
	data := functions.ReadDBCredentials()

	fmt.Println(data)

	pd, err := json.Marshal(data)
	if err != nil {
		log.Println(err)
	}

	return pd
}
