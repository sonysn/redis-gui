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

// TODO: HANDLE ERROR MESSAGES
func ConnectToRedis(a *RedisLogin, isSaved bool) string {
	addr := fmt.Sprintf("%s:%s", a.Host, a.Port)
	RedisConn = redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: a.Password, //a.Password, // no password set
		DB:       0,          // use default DB,
	})
	// fmt.Println(addr)

	_, err := RedisConn.Ping().Result()
	if err != nil {
		log.Println(err)
		return err.Error()
	} else {
		if !isSaved {
			StoreDBCredentials(a)
		}
		// StoreDBCredentials(a)
		log.Println("Connected to Redis!")
	}
	// fmt.Println("Connected to Redis!")
	// RedisConn.ClientList()
	return "Connected to Redis!"
}

func DisconnectFromRedis() {
	err := RedisConn.Close()
	if err != nil {
		return
	}
}

type KeyData struct {
	Type       string
	Key        string
	MemorySize string
}

func GetAllKeysAndType() []KeyData {
	keys, err := RedisConn.Keys("*").Result()
	if err != nil {
		log.Println(err)
	}

	var keysArray []KeyData

	for _, key := range keys {
		keyType, err := RedisConn.Type(key).Result()
		if err != nil {
			log.Println(err)
		}

		// data := map[string]string{
		// 	keyType: key,
		// }

		data := KeyData{
			Type:       keyType,
			Key:        key,
			MemorySize: getMemorySizeOfKey(key),
		}

		keysArray = append(keysArray, data)
	}

	return keysArray
}

func GetNumberOfKeys() string {
	keys, err := RedisConn.Keys("*").Result()
	if err != nil {
		log.Println(err)
	}

	return fmt.Sprintf("%d", len(keys))
}

func GetTotalDBUsedMemory() string {
	info, err := RedisConn.Info("MEMORY").Result()
	if err != nil {
		log.Println(err)
	}

	var usedMemory int64
	_, err = fmt.Sscanf(info, "# Memory\r\nused_memory:%d\r\n", &usedMemory)
	if err != nil {
		log.Println(err)
	}

	t := calculateSize(usedMemory)
	return t
}

func calculateSize(size int64) string {
	if size < 1024 {
		return fmt.Sprintf("%d B", size)
	} else if size < 1024*1024 {
		return fmt.Sprintf("%.2f KB", float64(size)/1024)
	} else if size < 1024*1024*1024 {
		return fmt.Sprintf("%.2f MB", float64(size)/(1024*1024))
	} else {
		return fmt.Sprintf("%.2f GB", float64(size)/(1024*1024*1024))
	}
}

func getMemorySizeOfKey(key string) string {
	info, _ := RedisConn.MemoryUsage(key).Result()

	return calculateSize(info)
}
