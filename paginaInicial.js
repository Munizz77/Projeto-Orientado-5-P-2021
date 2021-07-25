        //Criando Banco de dados
		var banco = openDatabase('agendaTelefonica4','1.0','Bd das agendas',1024*10248*2);
		banco.transaction(function(tx){
			//Criando Tabela agendas
			tx.executeSql('create table if not exists agendas(id INTEGER not null primary key AUTOINCREMENT, nome VARCHAR not null,  telefoneResidencial VARCHAR not null,  telefoneCelular VARCHAR not null,  email VARCHAR not null, redeSocial VARCHAR not null)');
		})
	

	//Função para inserir novos dados na tabela
	/**
	 * 
	 * @param {} dados 
	 */
	function insertAgenda(dados){
        banco.transaction(function(tx){
        	tx.executeSql('insert into agendas(nome, telefoneResidencial, telefoneCelular, email, redeSocial) values(?,?,?,?,?)',dados, 
        		function(resultado){
               		alert('Dados inseridos!!');
        		},
        		function(erro){
        			alert('ERROR');
        	})
        });
	}

    //Função para mostrar agendas
	function getAgendas(){
		banco.transaction(function(tx){
			tx.executeSql('SELECT * FROM agendas',[],
			function(tx,resultado){
              var tamanho = resultado.rows.length;
                       var i;
                       var texto;
					   //Percorrendo todos os registros e mostrando seus dados.
                       for(i = 0; i < tamanho; i++ ){
                        texto = '<div class="vers"><br><br>Nº de Registro #<span class="dadosDoUsuario">'+resultado.rows.item(i).id +'</span><br><br>Nome =  <span class="dadosDoUsuario">'+resultado.rows.item(i).nome+
                        '</span><br><br>Telefone Residencial = <span class="dadosDoUsuario">'+resultado.rows.item(i).telefoneResidencial+'</span><br><br>Telefone Celular = <span class="dadosDoUsuario">'+resultado.rows.item(i).telefoneCelular + '</span><br><br>Email = <span class="dadosDoUsuario">'+resultado.rows.item(i).email +'</span><br><br>Data = <span class="dadosDoUsuario">'+resultado.rows.item(i).redeSocial+ '</span></div>';
                        document.querySelector("#listaMembros").innerHTML += texto; 

                       } 
			},
			function(erro) {
				console.log("erro ao listar agendas");
			})
		});

	}

	//Pegando uma unica agenda com parâmetro
	function getAgendaUnica(id){
		banco.transaction(function(tx){
			tx.executeSql('SELECT * FROM agendas WHERE id = ?',[id],
			function(tx,resultado){
              var tamanho = resultado.rows.length;
                       var i;
                       var texto;
					   	//Percorrendo todos os registros e mostrando somente o que o usuário digitou
                       for(i = 0; i < tamanho; i++ ){
						   //Atribuindo método item para transformar os objetos e para facilitar as buscas
                       	    item = resultado.rows.item(i);
	                        texto = '<p><br><br>Nº de Registro #'+item['id'] +'<br><br>Nome:   <span>'+ item['nome'] +
	                        '</span><br><br>Telefone Residencial   : '+item['telefoneResidencial'] +
	                        '<br><br>Telefone Celular:  '+ item['telefoneCelular']+ '<br><br>Email:   '+
	                        item['email'] +'<br><br>Data:   '+ item['redeSocial']+ '</p>' +
	                        '<br><br><br> <a id="excluir-Agendas" href="#" onClick="excluirAgendas('+item['id']+')"> Excluir Agenda </a> <br>';
	                        document.querySelector("#aquimesmo").innerHTML = texto;

                       }                    
                       console.log("sucesso ao ver");                   
			},
			function(erro) {
				console.log("erro ao listar agendas");
			})
		});

	}

	//Passando todos os novos dados como parâmetro para fazer o update no banco de dados
	function alteraAgenda(id,nome2,telefoneResidencial2,telefoneCelular2,email2,redeSocial2){
    	banco.transaction(function(tx){
    		tx.executeSql('UPDATE agendas SET nome = ?, telefoneResidencial = ?, telefoneCelular = ?, email = ?, redeSocial = ? WHERE id = ?',[nome2,telefoneResidencial2,telefoneCelular2,email2,redeSocial2, id],
    			function(tx,resultado){
    				alert('SUA AGENDA FOI ALTERADA COM SUCESSO!!!');
    			},
    			function(erro){
    				console.log("Erro, tente novamente");
    			});

    	})
    }

    //Excluindo a agenda que for passada como parâmetro
    function excluirAgendas(id){
        banco.transaction(function(tx){

            tx.executeSql('DELETE FROM agendas WHERE id = ? ',[id],
            function(tx,resultado){
          		alert('Excluido com Sucesso');                           
            },
            function(erro) {
                console.log("Erro ao deletar agendas, tente novamente");
            });
        });

    }

 


