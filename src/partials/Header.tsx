import Button from '@/components/Button';
import PlusIcon from '@/assets/icons/plus.svg'
import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';
import TextField from '@/components/TextField';
import { createTodo, ITodoRequest } from '@/api/services/todos';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormErrors from '@/components/FormErrors';
import useForm from '@/hooks/useForm';
import { disabledButtonClassNames } from '@/utils/ui';
import { AxiosErrorMessage } from '@/types/axios';

export default function Header() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const { formValues, handleChange, reset: resetForm } = useForm<ITodoRequest>({
        title: '',
        description: ''
    })

    const { isLoading: isLoadingMutation,  mutate, error, reset: resetMutation } = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
            setModalOpen(false)
        }
    })

    const axiosError = error as AxiosErrorMessage

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(formValues)
    }

    useEffect(() => {
        if (!modalOpen) {
            resetForm()
            resetMutation()
        }
    }, [modalOpen])

    return (
        <>
            <header className="fixed p-5 flex gap-3 items-center border-b border-gray-200 w-full bg-white z-[1]">
                <h1 className="font-bold text-lg">
                    Product Roadmap
                </h1>

                <Button className="!py-2" onClick={() => setModalOpen(true)}>
                    <div className="flex">
                        <img src={PlusIcon} className="mr-1" />
                        <span className="text-xs font-bold">Add New Group</span>
                    </div>
                </Button>
            </header>

            <Modal id={'new-group-modal'} title={'Create Group'} modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={onSubmit}>
                    <TextField 
                        id="title" 
                        label="Title"
                        name="title"
                        className="mb-4"
                        placeholder="Group Task 1"
                        value={formValues.title}
                        handleChange={handleChange}
                        inputProps={{
                            className: 'w-full'
                        }}
                    />

                    <TextField
                        id="description" 
                        label="Description"
                        name="description"
                        className="mb-7"
                        value={formValues.description}
                        placeholder="January - February"
                        handleChange={handleChange}
                        inputProps={{
                            className: 'w-full'
                        }}
                    />

                    {
                        axiosError?.response?.data 
                            ? <FormErrors errors={[axiosError.response?.data?.message]} className="mb-7" /> 
                            : null
                    }

                    <div className="flex justify-end">
                        <Button variant="light" type="reset" className="mr-2.5" onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>

                        <Button 
                            type="submit" 
                            className={disabledButtonClassNames(isLoadingMutation)}
                            disabled={isLoadingMutation}
                        >
                            {isLoadingMutation ? 'Saving...' : 'Save Group'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}1