// https://discord.com/api/oauth2/authorize?client_id=698959965599170640&permissions=8&scope=bot%20applications.commands

import * as dotenv from 'dotenv';
import { default as app } from './app/app';
dotenv.config();

// RUN THE APP
app();
