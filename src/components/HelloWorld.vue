<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="student.nome" >
          <label>Quantidade</label>
          <input type="email" placeholder="Email" v-model="student.email" >

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>RA</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="student of students" :key="student.ra">

            <td>{{ student.ra }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.cpf }}</td>
            <td>{{ student.email }}</td>
            <td>
              <button @click="editar(student)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(student)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>
import StudentsServices from '../services/StudentsServices'
export default {
  name: 'app',
  data () {
    return {
      student:{
        ra: '',
        cpf: '',
        name: '',
        email:'',
      },
      students: [],
      errors: []
    }
  },
  mounted(){
    this.listar()
  },
  methods:{
    
    listar(){
      StudentsServices.listar().then(resposta => {
        this.students = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },
    salvar(){
      if(!this.student.ra){
        StudentsServices.salvar(this.student).then(resposta => {
          this.student = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }else{
        StudentsServices.atualizar(this.student).then(resposta => {
          this.student = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
      
    },
    editar(student){
      this.student = student
    },
    remover(student){
      if(confirm('Deseja excluir o produto?')){
        StudentsServices.apagar(student).then(resposta => {
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
    }
  }
}
</script>

<style>
</style>