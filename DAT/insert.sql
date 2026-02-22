USE company;

-- =====================================
-- INSERT: SERVERS
-- =====================================

INSERT INTO servers (name, os, os_ver) VALUES
('srv-web-01',  'Ubuntu Server', '22.04 LTS'),
('srv-web-02',  'Ubuntu Server', '22.04 LTS'),
('srv-db-01',   'Debian',        '12'),
('srv-mail-01', 'Rocky Linux',   '9.3'),
('srv-dev-01',  'Windows Server','2022');

-- uložíme ID serverů do proměnných
SET @srv_web_01  = (SELECT id FROM servers WHERE name='srv-web-01');
SET @srv_web_02  = (SELECT id FROM servers WHERE name='srv-web-02');
SET @srv_db_01   = (SELECT id FROM servers WHERE name='srv-db-01');
SET @srv_mail_01 = (SELECT id FROM servers WHERE name='srv-mail-01');
SET @srv_dev_01  = (SELECT id FROM servers WHERE name='srv-dev-01');


-- =====================================
-- INSERT: SERVICES
-- =====================================

INSERT INTO services (name, s_type, s_ver) VALUES
('Nginx',        'síťová',     '1.24'),
('MariaDB',      'aplikační',  '10.11'),
('Postfix',      'síťová',     '3.8'),
('Docker',       'aplikační',  '26.1'),
('Node.js API',  'aplikační',  '20 LTS'),
('Prometheus',   'aplikační',  '2.52');

-- uložíme ID služeb do proměnných
SET @svc_nginx      = (SELECT id FROM services WHERE name='Nginx');
SET @svc_mariadb    = (SELECT id FROM services WHERE name='MariaDB');
SET @svc_postfix    = (SELECT id FROM services WHERE name='Postfix');
SET @svc_docker     = (SELECT id FROM services WHERE name='Docker');
SET @svc_node       = (SELECT id FROM services WHERE name='Node.js API');
SET @svc_prometheus = (SELECT id FROM services WHERE name='Prometheus');


-- =====================================
-- INSERT: SERVICES RUNNING ON SERVERS
-- =====================================

INSERT INTO services_running_on_servers
(servers_id, services_id, domain, IPv4, IPv6, port, protocol, mode, startup)
VALUES
-- WEB SERVER 01
(@srv_web_01, @svc_nginx, 'www.company.local', '10.0.10.11', NULL, 80,  'HTTP', 'Installed', '2025-04-10 10:44:44'),
(@srv_web_01, @svc_node,  'api.company.local', '10.0.10.11', NULL, 3000,'HTTP', 'Running', '2444-04-04 04:44:44'),
(@srv_web_01, @svc_docker, NULL,               '10.0.10.11', NULL, NULL,NULL, 'Started','2026-02-22 17:40:14' ),

-- WEB SERVER 02
(@srv_web_02, @svc_nginx, 'shop.company.local','10.0.10.12', NULL, 443, 'HTTPS', 'Failed','2022-02-22 22:22:22'),
(@srv_web_02, @svc_docker,NULL,                '10.0.10.12', NULL, NULL,NULL),

-- DB SERVER
(@srv_db_01, @svc_mariadb, NULL, '10.0.20.10', NULL, 3306, 'TCP', 'Running','2023-07-24 01:11:11'),
(@srv_db_01, @svc_prometheus, NULL, '10.0.20.10', NULL, 9090, 'HTTP', 'Stopped','2007-04-10 09:30:21'),

-- MAIL SERVER
(@srv_mail_01, @svc_postfix, 'mail.company.local', '10.0.30.5', NULL, 25, 'SMTP', 'Failed','1970-07-12 20:34:59'),

-- DEV SERVER
(@srv_dev_01, @svc_docker, NULL, '10.0.40.15', NULL, NULL, NULL),
(@srv_dev_01, @svc_node,   'dev-api.company.local', '10.0.40.15', NULL, 3001, 'HTTP', 'Stopped','2021-09-29 23:21:23');
