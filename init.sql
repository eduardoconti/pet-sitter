CREATE TABLE tb_pet (
  id uuid NOT NULL,
  nome character varying(128) NOT NULL,
  data_inclusao TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT pk_tb_pet PRIMARY KEY (id)
)