package functions

import (
	"bufio"
	"bytes"
	"fmt"
	"log"
	"os"
	"strings"
)

const fileName = "rs.txt"

func StoreDBCredentials(s *RedisLogin) {
	_, err := os.Stat(fileName)
	if os.IsNotExist(err) {
		f, err := os.Create(fileName)
		if err != nil {
			log.Println(err)
		}
		defer f.Close()
	}

	f, err := os.OpenFile(fileName, os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		log.Println(err)
	}
	defer f.Close()

	_, err = f.WriteString(fmt.Sprintf("%s:%s:%s:%s:%s\n", s.Host, s.Port, s.Password, s.Username, s.DatabaseAlias))
	if err != nil {
		log.Println(err)
	}
}

func ReadDBCredentials() []RedisLogin {
	f, err := os.Open(fileName)
	if err != nil {
		log.Println(err)
	}

	defer f.Close()

	login := []RedisLogin{}

	scanner := bufio.NewScanner(f)

	for scanner.Scan() {
		line := scanner.Text()
		split := strings.Split(line, ":")
		login = append(login, RedisLogin{
			Host:          split[0],
			Port:          split[1],
			Password:      split[2],
			Username:      split[3],
			DatabaseAlias: split[4],
		})
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error scanning file:", err)
	}

	return login
}

func DeleteDBCredentials(a *RedisLogin) (string, error) {
	_, err := os.Stat(fileName)
	if os.IsNotExist(err) {
		return "", err
	}

	f, err := os.Open(fileName)
	if err != nil {
		log.Println(err)
	}
	defer f.Close()

	var buffer []byte
	bufScanner := bytes.NewBuffer(buffer)

	dbCredentials := fmt.Sprintf("%s:%s:%s:%s:%s", a.Host, a.Port, a.Password, a.Username, a.DatabaseAlias)

	scanner := bufio.NewScanner(f)

	for scanner.Scan() {
		line := scanner.Text()
		if line != dbCredentials {
			bufScanner.WriteString(line)
			bufScanner.WriteString("\n")
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error scanning file for deletion:", err)
	}

	err = os.WriteFile(fileName, bufScanner.Bytes(), 0644)
	if err != nil {
		log.Println(err)
		return "", err
	}

	return "Deleted!", nil
}
