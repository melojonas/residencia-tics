import axios from 'axios';

const apí = axios.create({
    baseURL: 'http://localhost/8080'
})

api.get('rota').then((response) => {let dados = response.data})

const [activeTable, setActiveTable] = useState('tabelaGeral');
    const [users, setUsers] = useState(exampleUsers);
    // const [users, setUsers] = useState([]);

    // Simula a busca de dados do usuário
    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/users'); // Substituir pela rota da API
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erro ao buscar os dados do usuário:', error);
        }
    };

    // Chama a função de busca de dados quando o componente for montado
    useEffect(() => {
        fetchUserData();
    }, []);