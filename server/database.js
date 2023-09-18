const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { Module } = require('module');
const { log } = require('console');
dotenv.config();
const uri = process.env.MONGODBURL;

// MODELO PARA INSERIR DADOS, CRIAR BANCO DE DADOS E DOCUMENTOS



async function run(inserir=false, procurar=false, atualizar=false, deletar=false, banco, documento, data) {

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
 
  if(inserir == true){
    try {
      await client.connect();

      const dbo = client.db(`${banco}`);
      const colecao = `${documento}`;
      const obj = {data};
      
      await dbo.collection(colecao).insertOne(obj);
      console.log('Um novo registro inserido');

    } finally {
      await client.close();
    }
  } else if (procurar == true){
    try {
      await client.connect();

      const dbo = client.db(`${banco}`);
      const colecao = `${documento}`;
      const obj = {data};
      
      await dbo.collection(colecao).findOne(obj);
      console.log("Documento encontrado");

    } finally {
      await client.close();
    }
  } else if (atualizar == true){
    try {
      await client.connect();

      const dbo = client.db(`${banco}`);
      const colecao = `${documento}`;
      const obj = {data};
      
      await dbo.collection(colecao).updateOne(obj);
      console.log("Documento atualizado");

    } finally {
      await client.close();
    }
  } else if (deletar == true){
    try {
      await client.connect();

      const dbo = client.db(`${banco}`);
      const colecao = `${documento}`;
      const obj = {data};
      
      await dbo.collection(colecao).deleteOne(obj);
      console.log("Valor deletado");

    } finally {
      await client.close();
    }
  }
}

run().catch(console.dir);

module.exports = run();








