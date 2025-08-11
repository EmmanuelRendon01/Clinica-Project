CREATE TABLE pacientes (id SERIAL PRIMARY KEY, 
nombre_paciente VARCHAR(155) NOT NULL,
correo_paciente VARCHAR(255) UNIQUE NOT NULL);

CREATE TABLE medicos (id SERIAL PRIMARY KEY,
nombre_medico VARCHAR(155) NOT NULL);

CREATE TABLE especialidades (id SERIAL PRIMARY KEY,
nombre_especialidad VARCHAR(80) NOT NULL);

CREATE TABLE medico_especialidad (id SERIAL PRIMARY KEY,
id_medico INT,
id_especialidad INT,
FOREIGN KEY (id_medico) REFERENCES medicos(id) ON DELETE SET NULL,
FOREIGN KEY (id_especialidad) REFERENCES especialidades(id) ON DELETE SET NULL);

CREATE TABLE metodos_pago (id SERIAL PRIMARY KEY,
nombre_metodo_pago VARCHAR(50) UNIQUE NOT NULL);

CREATE TABLE estados_cita (id SERIAL PRIMARY KEY,
nombre_estado VARCHAR(50) UNIQUE NOT NULL);

CREATE TABLE ubicaciones (id SERIAL PRIMARY KEY,
nombre_ubicacion VARCHAR(50) UNIQUE NOT NULL);

CREATE TABLE citas (id SERIAL PRIMARY KEY,
fecha_cita DATE NOT NULL,
hora_cita TIME NOT NULL,
motivo VARCHAR(255) NOT NULL,
descripcion TEXT,
id_ubicacion INT,
id_metodo_pago INT,
id_estado INT,
id_paciente INT,
id_medico INT,
FOREIGN KEY (id_ubicacion) REFERENCES ubicaciones(id) ON DELETE SET NULL,
FOREIGN KEY (id_metodo_pago) REFERENCES metodos_pago(id) ON DELETE SET NULL,
FOREIGN KEY (id_estado) REFERENCES estados_cita(id) ON DELETE SET NULL,
FOREIGN KEY (id_paciente) REFERENCES pacientes(id) ON DELETE SET NULL,
FOREIGN KEY (id_medico) REFERENCES medicos(id) ON DELETE SET NULL);


SELECT c.id, c.fecha_cita, c.hora_cita, c.motivo, c.descripcion, u.nombre_ubicacion, m.nombre_metodo_pago,
e.nombre_estado, p.nombre_paciente, me.nombre_medico
FROM citas c
JOIN ubicaciones u ON u.id = c.id_ubicacion
JOIN metodos_pago m ON m.id = c.id_metodo_pago
JOIN estados_cita e ON e.id = c.id_estado
JOIN pacientes p ON p.id = c.id_paciente
JOIN medicos me ON me.id = c.id_medico