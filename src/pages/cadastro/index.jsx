import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MdEmail , MdLock, MdBadge} from 'react-icons/md';

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { api } from '../../services/api';
import { Container, Title, TitleLogin, SubTitleLogin, LoginText, Column, Row, JaTenhoText, Wrapper} from "./styles";


const schema= yup.object({
    nome: yup.string('Nome Inválido').min(3, 'No minimo 3 caracteres').required('Campo Obrigatório'),
    email: yup.string().email('email não é válido').required('Campo obrigatório'),
    password: yup.string().min(3, 'No minimo 3 caracteres').required('Campo obrigatório'),
  }).required();


const Cadastro = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    console.log(isValid, errors, control);  

    const onSubmit = async formData=> {
        try {
            const { data } = await api.post(`users?nome=${formData.nome}&email=${formData.email}&senha=${formData.password}`);
            console.log('retorno api', data);
            navigate('/feed');
        } catch {
            alert('Houve um erro, tente novamente...')
        }
    }

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>
                    A plataforma para você aprender com experts, dominar as principais tecnologias
                    e entrar mais rápido nas empresas mais desejadas.
                </Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Comece agora grátis</TitleLogin>
                    <SubTitleLogin>Crie sua conta e make the change._</SubTitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="nome" errorMessage={errors?.name?.message} control={control} placeholder="Nome Completo" leftIcon={<MdBadge />}/>
                        <Input name="email" errorMessage={errors?.email?.message} control={control} placeholder="E-mail" leftIcon={<MdEmail />}/>
                        <Input name="password" errorMessage={errors?.password?.message} control={control} placeholder="Senha" type="password" leftIcon={<MdLock />} />
                        <Button title="Criar minha conta" variant="secondary" type="submit"/>
                    </form>
                    <SubTitleLogin>
                        Ao clicar em "criar minha conta grátis", <br />
                        declaro que aceito as Políticas de <br />
                        Privacidade e os Termos de Uso da DIO.
                    </SubTitleLogin>
                    <Row>
                        <JaTenhoText>Ja tenho conta.</JaTenhoText>
                        <LoginText>Fazer login</LoginText>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }

