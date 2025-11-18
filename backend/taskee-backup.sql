--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    user_id integer,
    title character varying(255),
    description text,
    priority character varying(30) DEFAULT 'low'::character varying,
    due_date date,
    status character varying(255) DEFAULT 'in-progress'::character varying
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    username character varying(255),
    password character varying(255),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, user_id, title, description, priority, due_date, status) FROM stdin;
2	5	Read something	Read bible and pray of 2 hours non-stop	Medium	2026-05-03	completed
9	5	Forget it	Make more and forget about the rest	Medium	2004-04-30	in-progress
13	5	Drink	Drink some tea and bread	Medium	2005-09-21	in-progress
12	5	Study Hard	I have exam on monday so i have to study very hard	Low	2008-09-30	completed
11	5	Study Hard	I have exam on monday so i have to study very hard	Low	2008-09-30	completed
10	5	Make some future afiliations	Make all the people in the world trust you and make you feel realistically unpresidented	Low	3332-01-30	in-progress
5	5	Drink something	Take in some non-alcoholic drinks	Medium	2322-03-03	completed
1	5	Make money 	Register account on upwork and win clients	High	2026-03-30	in-progress
6	5	Ride a bicycle	Its been 3 years men, have to back! 	High	2007-02-03	in-progress
4	5	Fix my phone fast	My phone screen is worrying me a lot	High	2026-01-01	completed
17	5	Buy Benz C300	By age 28 then ive buy benz with ease, because it fits me	Medium	2028-03-30	completed
18	14	Prepare Banku	I have to go prepare Banku around 4pm because its very hot out here	High	2017-03-30	completed
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, username, password, created_at) FROM stdin;
5	izfaculty12@gmail.com	jayfaculty12	$2b$10$SwvG5bgYus7EBbuExUy4.e3c58H729y7nR.7eC0yr6wpPTVqYtyZa	2025-11-13 00:02:57.039783
6	jayfaculty1@gmail.com	jayfaculty1	$2b$10$Z3CuWpwUWa0qkl8jjo08A.saGUIrDiS2NfRQkUpxbe9oOhj0KxeHq	2025-11-13 23:15:01.145773
8	godfredentsie@gmail.com	godfred_0	$2b$10$PQlSOnJ7giEk1JinPfWWhuAwR38hhsn937rVIb05jEow0pMt6ZxK6	2025-11-13 23:21:07.291417
11	kobbybeatz1@gmail.com	kobbybeatz	$2b$10$DRht8i1gCYm4i0/pTNvcZuesFwg7QiPOxm2OBfsfzTWRw.AqXJ27O	2025-11-13 23:34:47.864959
13	louisa1@gmail.com	louisa1	$2b$10$qGJ5sTf8oK/Ki2Mn3zDD5O4Jb2eDAUr97ZN1L.uYohgwJLUzfuJ0W	2025-11-13 23:47:40.623239
14	yungtwist1@gmail.com	yungtwist1	$2b$10$M.oQw4IE3qAeIZ/lLO0tv.54jKSYr2U4B4vObIz/Hx7.01Z1Im8Na	2025-11-13 23:48:38.231439
\.


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 18, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

