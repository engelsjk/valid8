package internal

import (
	"os"

	"gopkg.in/yaml.v2"
)

type Config struct {
	Addr      string `yaml:"addr"`
	StaticDir string `yaml:"static_dir"`
	APIDir    string `yaml:"api_dir"`
}

func NewConfig(configPath string) (*Config, error) {

	config := &Config{}

	file, err := os.Open(configPath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	decoder := yaml.NewDecoder(file)

	if err := decoder.Decode(&config); err != nil {
		return nil, err
	}

	return config, nil
}
