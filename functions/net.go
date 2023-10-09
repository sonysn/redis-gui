package functions

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/go-redis/redis"
)

//	type Network struct {
//		ctx context.Context
//	}
var numS int = 0

func DdosAttack() int {
	// client, err := http.Get("http://www.google.com")
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// defer client.Body.Close()

	// fmt.Println(client.StatusCode)

	// return client.StatusCode
	// var num int = 301

	// c := num + 1
	numS = numS + 1
	return numS
}

func List() []byte {
	lis := [3]int32{12, 23, 32}

	tp := map[string][3]int32{
		"list": lis,
	}

	res, err := json.Marshal(tp)
	if err != nil {
		fmt.Println(err)
	}

	return res
}

type RedisLogin struct {
	Host          string
	Port          string
	Password      string
	Username      string
	DatabaseAlias string
}

var RedisConn *redis.Client

func ConnectToRedis(a *RedisLogin) {
	addr := fmt.Sprintf("%s:%s", a.Host, a.Port)
	RedisConn = redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: "", //a.Password, // no password set
		DB:       0,  // use default DB,
	})
	fmt.Println(addr)

	_, err := RedisConn.Ping().Result()
	if err != nil {
		log.Println(err)
		return
	} else {
		StoreDBCredentials(a)
		log.Println("Connected to Redis!")
	}
	// fmt.Println("Connected to Redis!")
	// RedisConn.ClientList()
}
