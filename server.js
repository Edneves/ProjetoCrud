const express = require('express') 
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const app = express()


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://edyuser89:942573@cluster0.y3pgi.mongodb.net/Cluster0?retryWrites=true&w=majority";
// Na linha logo acima, adicionar a URI do DB: Contendo userName + Password + nomeDoDataBase
MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
    if(err) return console.log(err);
    db = client.db('Cluster0') //Nome do Banco de Dados

    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    })                                                            
})                                                                

app.use(bodyParser.urlencoded({ extended: true }))


app.set('view engine', 'ejs')

app.get('/', (req, res) => {res.render('app.ejs');
});//Página de Menu do Projeto Crud

///////////////////////////////////////////////////////////////////////////////
app.get('/cadaster/abraao', (req, res) => {res.render('./CrudA/index.ejs');
});// Rota contendo página de cadastro de Abraão

app.get('/cadaster/ednaldo', (req, res) => {res.render('./CrudE/index.ejs');
});//Rota contendo página de cadastro de Ednaldo

app.get('/cadaster/jonas', (req, res) => {res.render('./CrudJ/index.ejs');
});//Rota contendo página de cadastro de Jonas

app.get('/cadaster/matheus', (req, res) => {res.render('./CrudM/index.ejs'); 
});//Rota contendo página de cadastro de Matheus

//////////////////////////////////////////////////////////////////////////////
app.get('/cadaster/abraao', (req,res) => {
    var cursor = db.collection('abraao').find()
});

app.get('/cadaster/ednaldo', (req,res) => {
    var cursor = db.collection('data').find()
});

app.get('/cadaster/jonas', (req,res) => {
    var cursor = db.collection('jonas').find()
});

app.get('/cadaster/matheus', (req,res) => {
    var cursor = db.collection('matheus').find()
});

/////////////////////////////////////////////////////////////////////

app.get('/show/abraao', (req, res) => {
    db.collection('abraao').find().toArray((err, results) => {
        if(err) return console.log(err);
        res.render('./CrudA/show.ejs', {data: results})
    })
});

app.get('/show/ednaldo', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if(err) return console.log(err);
        res.render('./CrudE/show.ejs', {data: results})
    })
});

app.get('/show/jonas', (req, res) => {
    db.collection('jonas').find().toArray((err, results) => {
        if(err) return console.log(err);
        res.render('./CrudJ/show.ejs', {data: results})
    })
});

app.get('/show/matheus', (req, res) => {
    db.collection('matheus').find().toArray((err, results) => {
        if(err) return console.log(err);
        res.render('./CrudM/show.ejs', {data: results})
    })
});

////////////////////////////////////////////////////////////////////////

app.post('/show/abraao', (req, res) => {
    db.collection('abraao').insertOne(req.body, (err, result) => {
        if(err) return console.log(err);

        console.log('Informações de Abraão salvas no Banco de Dados!');
        res.redirect('/show/abraao')
    })
});

app.post('/show/ednaldo', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if(err) return console.log(err);

        console.log('Informações de Ednaldo salvas no Banco de Dados!');
        res.redirect('/show/ednaldo')
    })
});

app.post('/show/jonas', (req, res) => {
    db.collection('jonas').insertOne(req.body, (err, result) => {
        if(err) return console.log(err);

        console.log('Informações de Jonas salvas no Banco de Dados!');
        res.redirect('/show/jonas')
    })
});

app.post('/show/matheus', (req, res) => {
    db.collection('matheus').insertOne(req.body, (err, result) => {
        if(err) return console.log(err);

        console.log('Informações de Matheus salvas no Banco de Dados');
        res.redirect('/show/matheus')
    })
});
////////////////////////////////////////////////////////////////////////////////////
app.route('/edit/abraao/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('abraao').find(ObjectId(id)).toArray((err, result) => {
        if(err) return res.send(err)
        res.render('./CrudA/edit.ejs', {data: result})
    })

})
.post((req, res) => {
    var id = req.params.id
    var nome = req.body.nome
    var sobrenome = req.body.sobrenome
    var cidade = req.body.cidade
    var email = req.body.email
    var time = req.body.time
    var telefone = req.body.telefone
    var sexo = req.body.sexo
    var jogador = req.body.jogador

    db.collection('abraao').updateOne({_id: ObjectId(id)}, {
        $set: {
            nome: nome,
            sobrenome: sobrenome,
            cidade: cidade,
            email: email,
            time: time,
            telefone: telefone,
            sexo: sexo,
            jogador: jogador
        }
    }, (err, result) => {
        if(err) return res.send(err)
        res.redirect('/show/abraao')
        console.log('Informações de Abraão atualizadas no Banco de Dados!');
    })
})
app.route('/delete/abraao/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('abraao').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if(err) return res.send(500, err)
        console.log('Informações de Abraão deletadas do Banco de Dados!');
        res.redirect('/show/abraao')
    })
})
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
app.route('/edit/ednaldo/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if(err) return res.send(err)
        res.render('./CrudE/edit.ejs', {data: result})
    })

})
.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname
    var cpf = req.body.cpf
    var telefone = req.body.telefone
    var anoNascimento = req.body.anoNascimento
    var email = req.body.email
    var userName = req.body.userName
    var password = req.body.password

    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname,
            cpf: cpf,
            telefone: telefone,
            anoNascimento: anoNascimento,
            email: email,
            userName: userName,
            password: password
        }
    }, (err, result) => {
        if(err) return res.send(err)
        res.redirect('/show/ednaldo')
        console.log('Informações de Ednaldo atualizadas no Banco de Dados!');
    })
})
app.route('/delete/ednaldo/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if(err) return res.send(500, err)
        console.log('Informações de Ednaldo deletadas do Banco de Dados!');
        res.redirect('/show/ednaldo')
    })
})
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
app.route('/edit/jonas/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('jonas').find(ObjectId(id)).toArray((err, result) => {
        if(err) return res.send(err)
        res.render('./CrudJ/edit.ejs', {data: result})
    })

})
.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname
    var idade = req.body.idade
    var rg = req.body.rg
    var email = req.body.email
    var telefone = req.body.telefone
    var endereco = req.body.endereco
    var sexo = req.body.sexo  
  
    db.collection('jonas').updateOne({_id: ObjectId(id)}, {
      $set: {
        name: name,
        surname: surname,
        idade: idade,
        rg: rg,
        email: email,
        telefone: telefone,
        endereco: endereco,
        sexo: sexo
        }
    }, (err, result) => {
        if(err) return res.send(err)
        res.redirect('/show/jonas')
        console.log('Informações de Jonas atualizadas no Banco de Dados!');
    })
})
app.route('/delete/jonas/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('jonas').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if(err) return res.send(500, err)
        console.log('Informações de Jonas deletadas do Banco de Dados!');
        res.redirect('/show/jonas')
    })
})
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
app.route('/edit/matheus/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('matheus').find(ObjectId(id)).toArray((err, result) => {
        if(err) return res.send(err)
        res.render('./CrudM/edit.ejs', {data: result})
    })

})
.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname
    var cpf = req.body.cpf
    var email = req.body.email
    var numero = req.body.numero
    var cep = req.body.cep
    var ufCidade = req.body.ufCidade
    var sexo = req.body.sexo

    db.collection('matheus').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname,
            cpf: cpf,
            email: email,
            numero: numero,
            cep: cep,
            ufCidade: ufCidade,
            sexo: sexo
        }
    }, (err, result) => {
        if(err) return res.send(err)
        res.redirect('/show/matheus')
        console.log('Informações de Matheus atualizadas no Banco de Dados!');
    })
})
app.route('/delete/matheus/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('matheus').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if(err) return res.send(500, err)
        console.log('Informações de Matheus deletadas do Banco de Dados!');
        res.redirect('/show/matheus')
    })
})
/////////////////////////////////////////////////////////////////////////////////////////////////