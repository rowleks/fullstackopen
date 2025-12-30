import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogService'
import loginService from '../services/loginService'
import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { useNotification } from '../context/NotificationContext'
import userService from '../services/userService'
import commentService from '../services/commentService'

export const useBlogResource = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()
  const { user: loggedUser } = useUser()

  const notify = (message, type = 'success') => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const resources = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllBlogs,
  })

  const createMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: newResource => {
      const currentResources = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(['blogs'], currentResources.concat(newResource))
      notify(`Blog '${newResource.title}' created successfully`)
    },
    onError: error => {
      const serverErrorMsg =
        error.response?.data?.error || 'Error creating blog'
      notify(serverErrorMsg, 'error')
    },
  })

  const updateMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: updatedResource => {
      const currentResources = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(
        ['blogs'],
        currentResources.map(r =>
          r.id === updatedResource.id ? updatedResource : r
        )
      )
    },
    onError: error => {
      notify(error.response?.data?.error || 'Failed to update blog', 'error')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_, variables) => {
      const currentResources = queryClient.getQueryData(['blogs']) || []
      const blog = currentResources.find(b => b.id === variables)
      queryClient.setQueryData(['blogs'], blogs =>
        blogs.filter(b => b.id !== variables)
      )
      notify(`Blog '${blog ? blog.title : 'item'}' removed`)
    },
    onError: error => {
      notify(error.response?.data?.error || 'Failed to remove blog', 'error')
    },
  })

  const update = (resource, options) => {
    blogService.setToken(loggedUser.token)
    updateMutation.mutate(resource, options)
  }

  const remove = (id, options) => {
    blogService.setToken(loggedUser.token)
    deleteMutation.mutate(id, options)
  }

  const create = (resource, options) => {
    blogService.setToken(loggedUser.token)
    createMutation.mutate(resource, options)
  }

  const service = {
    create,
    update,
    remove,
  }

  return [resources, service]
}

export const useLoginResource = () => {
  const { dispatch: userDispatch } = useUser()
  const { dispatch: notificationDispatch } = useNotification()

  const notify = (message, type = 'success') => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, type },
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const mutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: user => {
      userDispatch({ type: 'LOGIN', payload: user })
    },
    onError: error => {
      notify(error.response?.data?.error || 'Wrong credentials', 'error')
    },
  })

  const login = (credentials, options) => mutation.mutate(credentials, options)

  return { login }
}

export const useUserResources = () => {
  const { dispatch } = useNotification()
  const queryClient = useQueryClient()

  const users = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
  })

  const notify = (message, type = 'success') => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const createMutation = useMutation({
    mutationFn: userService.registerUser,
    onSuccess: newUser => {
      queryClient.invalidateQueries(['users'])
      notify(`User '${newUser.username}' registered successfully`)
    },
    onError: error => {
      notify(error.response?.data?.error || 'Error registering user', 'error')
    },
  })

  const register = (credentials, options) =>
    createMutation.mutate(credentials, options)

  return { users, register }
}

export const useCommentResources = id => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()
  const { user: loggedUser } = useUser()

  const notify = (message, type = 'success') => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const createMutation = useMutation({
    mutationFn: newComment => commentService.create(newComment, id),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      notify(`Comment added successfully`)
    },
    onError: error => {
      notify(error.response?.data?.error || 'Error adding comment', 'error')
    },
  })

  const create = comment => {
    commentService.setToken(loggedUser.token)
    createMutation.mutate(comment)
  }

  return {
    create,
  }
}

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    inputProps: {
      type,
      value,
      onChange,
    },
    reset,
  }
}
