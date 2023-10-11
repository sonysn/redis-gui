package main

import (
	"context"
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

func (a *App) ConnectToRedisDB(host string, port string, password string, username string, databaseAlias string, isSaved bool) string {

	login := &functions.RedisLogin{
		Host:          host,
		Port:          port,
		Password:      password,
		Username:      username,
		DatabaseAlias: databaseAlias,
	}
	res := functions.ConnectToRedis(login, isSaved)
	// fmt.Println("Connect to redis: ", name)
	return res
}

func (a *App) DisconnectFromRedisDB() {
	functions.DisconnectFromRedis()
}

func (a *App) ReadDBCredentials() []functions.RedisLogin {
	data := functions.ReadDBCredentials()

	fmt.Println(data)

	return data
}

func (a *App) DeleteDBCredentials(host string, port string, password string, username string, databaseAlias string, isSaved bool) string {

	credentials := &functions.RedisLogin{
		Host:          host,
		Port:          port,
		Password:      password,
		Username:      username,
		DatabaseAlias: databaseAlias,
	}

	msg, err := functions.DeleteDBCredentials(credentials)
	if err != nil {
		log.Println(err)
		return "Error deleting DB credentials"
	}
	return msg
}

func (a *App) GetAllKeysAndType() []map[string]string {
	data := functions.GetAllKeysAndType()
	return data
}

func (a *App) GetNumberOfKeys() string {
	data := functions.GetNumberOfKeys()
	return data
}

func (a *App) GetTotalDBSize() string {
	data := functions.GetTotalDBUsedMemory()
	return data
}
