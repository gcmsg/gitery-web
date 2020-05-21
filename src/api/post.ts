import request from '@/utils/request'

export const getPost = (id: number) =>
    request({
        url: `/post/${id}`,
        method: 'get',
    })

export const createPost = (data: any) =>
    request({
        url: '/post',
        method: 'post',
        data
    })

export const updatePost = (id: number, data: any) =>
    request({
        url: `/post/${id}`,
        method: 'patch',
        data
    })

export const deletePost = (id: number) =>
    request({
        url: `/post/${id}`,
        method: 'delete'
    })