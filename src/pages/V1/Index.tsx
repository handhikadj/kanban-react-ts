import Header from '@/partials/Header'
import Board from '@/partials/Board/Index'

export default function Index() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <Board />
        </div>
    )
}
