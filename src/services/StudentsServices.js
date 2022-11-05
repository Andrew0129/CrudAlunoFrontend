import { http } from './config'

export default	{

	salvar:(Student)=>{
		return http.post('Student',Student);
  },
    
	atualizar:(Student)=>{
		return http.put('Student',Student);
  },

  listar:()=>{
		return http.get('Student')
  },
    
	apagar:(ra)=>{
		return http.delete('Student?ra=',ra)
	}
}