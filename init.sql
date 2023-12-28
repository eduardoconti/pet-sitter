CREATE EXTENSION "uuid-ossp"
CREATE TYPE public.tb_pet_temperamento_enum AS ENUM('D', 'A')
CREATE TABLE tb_pet (
  id uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
  nome character varying(128) NOT NULL,
  data_inclusao TIMESTAMP WITH TIME ZONE NOT NULL,
  temperamento public.tb_pet_temperamento_enum NOT NULL,
  CONSTRAINT pk_tb_pet PRIMARY KEY (id)
)

CREATE TYPE public.tb_atendimento_status_enum AS ENUM('N', 'A', 'F')
CREATE TABLE tb_atendimento(
    id uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
    id_pet_sitter uuid,
    id_tutor uuid,
    status public.tb_atendimento_status_enum NOT NULL,
    data_inclusao timestamp with time zone NOT NULL,
    CONSTRAINT pk_tb_atendimento PRIMARY KEY (id)
);

CREATE TABLE tb_pet_sitter (
  id uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
  nome character varying(128) NOT NULL,
  data_inclusao TIMESTAMP WITH TIME ZONE NOT NULL,
  data_nascimento TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT pk_tb_pet_sitter PRIMARY KEY (id)
)
