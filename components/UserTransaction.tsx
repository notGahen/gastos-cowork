'use client'
import { z } from 'zod'
import {CospendUserList} from "@/zodTypes";
import {FunctionComponent, useActionState, useState} from "react"
import {registerExpense} from '@/actions';
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form';
import {expenseList} from '@/lib/config';

type TCospendUserList = z.infer<typeof CospendUserList>;

interface IProps {
  userList?: TCospendUserList
  user?: TCospendUserList[0]
}

export const UserTransaction: FunctionComponent<IProps> = ({ userList, user }) => {
  const [state, formAction] = useActionState(registerExpense, { message: '' })

  const formSchema = z.object({
    user: z.string().min(1, { message: "Debes seleccionar una opción" }),
    expense: z.string().min(1, { message: "Debes seleccionar una opción" }),
    pagoDiferido: z.boolean().optional()
  })
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      expense: "",
      pagoDiferido: false
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('user', values.user)
    formData.append('expense', values.expense)
    if (values.pagoDiferido) {
      formData.append('pagoDiferido', 'on')
    }
    formAction(formData)
  }
  return (
        <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card bg-black border-primary" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4" style={{ color: '#0ff', textShadow: '0 0 10px #0ff' }}>Registrar venta</h2>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            { userList && (
              <div className="mb-3">
                <label htmlFor="user" className="form-label" style={{ color: '#0f0' }}>¿Quién registra el cobro?</label>
                  <select
                    {...form.register('user')}
                    className="form-select bg-dark text-light border-primary"
                    style={{ boxShadow: '0 0 10px #00f' }}
                    defaultValue={user?.id}
                  >
                    {userList.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                  {form.formState.errors.user && (
                    <div className="text-danger mt-1">{form.formState.errors.user.message}</div>
                  )}
              </div>
            )} 
            <div className="mb-3">
              <label htmlFor="expense" className="form-label" style={{ color: '#0f0' }}>¿Qué se cobra?</label>
              <select
                {...form.register('expense')}
                className="form-select bg-dark text-light border-primary"
                style={{ boxShadow: '0 0 10px #00f' }}
              >
                {expenseList.map((expense) => (
                  <option key={expense.name} value={expense.name}>{expense.name} ({expense.amount})</option>
                ))}
              </select>
              {form.formState.errors.expense && (
                <div className="text-danger mt-1">{form.formState.errors.expense.message}</div>
              )}
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="pagoDiferido"
                defaultChecked={true}
                {...form.register('pagoDiferido')}
              />
              <label className="form-check-label" htmlFor="pagoDiferido" style={{ color: '#0f0' }}>
                Pago diferido (se consolida a fin de mes)
              </label>
            </div>
            <button type="submit" className="btn btn-outline-primary w-100" style={{ textShadow: '0 0 5px #00f' }}>
              Enviar
            </button>
          </form>
          {state?.message && (
            <div className="alert alert-success mt-3" role="alert">
              {state?.message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
