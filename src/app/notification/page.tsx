'use client';

import Link from 'next/link'
import { PATH } from '#app/routes'
import CardTitle from '#components/_common/CardTitle'
import { Card } from '#components/_common/Card'
import { Button } from '#components/_common/Button'
import { cn } from '#components/lib/utils'
import ItemList from '#app/item/page'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {Delete} from 'lucide-react'

interface Notification {
  id: number;
  category: string;
  message: string;
  status: 'READ' | 'UNREAD';
  registerDate: string;
  updateDate: string;
}

interface NotificationResponse {
  contents: Notification[];
  size: number;
  hasNext: boolean; // 현재 페이지 이후 추가로 불러올 데이터 존재 유무 
  status: string;
  message?: string;
}

export default function NotificationList() {
  const queryClient = useQueryClient();

  // 알림 리스트 조회 API . 데이터 가져오는 작업에 useQuery가 적합 
  const {isPending: notiLoading, error: notiError, data: notiData} = useMutation<any, Error, number>({
    mutationFn: async (id: number) => {
      const response = await fetch('http://localhost:8080/api/notifications', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastId: 0, size: 0 })
      });
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`알림 리스트 가져오기 실패: ${notiError.message || response.statusText}`);
      }
      
      const data = await response.json()

      if (data.status !== '100 CONTINUE') {
        throw new Error(`알림 리스트 가져오기 실패: ${data.message}`);
      }

      return data
    },
    onSuccess: (data) => {
      console.log('알림 읽음 처리 성공', data);
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('알림 읽음 처리 실패', error);
    },
  })
  // //= useQuery<NotificationResponse>({
  //   queryKey: ['notifications'],
  //   queryFn: async () => {
      

      
  //   },
  // })

  // 알림 읽음 처리 API 
  const {mutate: readNoti, isPending: readNotiLoading, error: readNotiError, data: readNotiData} = useMutation ({
    mutationFn: async () => {
      const response = await fetch('http://localhost:8080/api/notifications', {
        method: "PUT",
        headers: { 'Content-Type': 'application/json'},
      });

      if (!response.ok) {
        const errorAlarm = await response.json()
        throw new Error(`알림 읽음 처리 실패: ${readNotiError.message || response.statusText}`);
      }

      const data = await response.json()

      if (data.status !== '100 CONTINUE') {
        throw new Error(`알림 상태 불일치: ${data.message}`)
      }

      return data
    },
    onSuccess: (data) => {
      console.log('알림 읽음 처리', data)
    },
    onError: (error) => {
      throw new Error ('알림 읽음 처리', error)
    },
  })

  // 알림 삭제 API 
  const {mutate: deleteNoti, isPending: deleteNotiLoading, error: deleteNotiError, data: deleteNotiData } = useMutation ({
    mutationFn: async () => {
      const response = await fetch('http://localhost:8080/api/notifications', {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'},
      });

      if (!response.ok) {
        const errorAlarm = await response.json()
        throw new Error(`알림 삭제 처리 실패: ${readNotiError.message || response.statusText}`);
      }

      const data = await response.json()

      if (data.status !== '100 CONTINUE') {
        throw new Error(`알림 삭제 실패: ${data.message}`)
      }

      return data
    },
    onSuccess: (data) => {
      console.log('알림 삭제 처리 성공', data)
    },
    onError: (error) => {
      throw new Error ('알림 삭제 처리 성공', error)
    },
  })


  if (!notiData || notiData.contents.length === 0) {
    return <p>알림이 없습니다</p>
  } else if (notiLoading) {
    <p>로딩 중입니다.</p>
  } else if (notiError) {
    return <p>알림을 불러오는 중 오류가 발생했습니다.</p>
  }

  return (
    <CardTitle className="mx-auto p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <div className="flex flex-col items-center w-full mt-5">
        <h2 className="text-3xl sm:text-3xl font-bold">알림</h2>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>
      <div className="flex-1 overflow-auto">
      <div className="grid grid-cols-1 gap-3">
        {notiData.contents.map((notification) => (
        <div
          key={notification.id}
          onClick={() => {
            if (notification.status !== 'READ') {
              readNoti(notification.id);
            }
          }}
        >
          <Card
            className={cn(
              'flex justify-between items-center p-4 rounded-lg shadow-md dark:bg-gray-800 bg-white hover:bg-slate-200 hover:dark:bg-gray-700'
            )}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNoti(notification.id);
                }}
              >
                <Delete size={20} />
              </button>
              <div>
                <h3 className="font-medium">{notification.message}</h3>
                <p className="text-xs dark:text-gray-500">
                  {new Date(notification.registerDate).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              {notification.status !== 'READ' && (
                <span className="text-xs font-semibold text-red-500">읽지 않음</span>
              )}
            </div>
          </Card>
        </div>
      ))}
    </div>
      </div>
    </CardTitle>
  )
}

        {/* <Link href={PATH.groupDetail(1)} passHref>
          <Card
            key={1}
            className={cn(
              'mb-2 bg-red-100 dark:bg-red-300 hover:bg-slate-200 hover:dark:bg-red-00 flex justify-between items-center p-4 rounded-lg shadow-md',
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn('w-8 h-8 rounded-full')}></div>
              <div>
                <h3 className="font-medium">유튜브 프리미엄 그룹 초대</h3>
                <p className="text-xs text-gray-500">
                  김민수 님이 그룹에 초대하셨습니다
                </p>
              </div>
              <p className="px-3 py-1 text-sm text-red-600 bg-red-600/20 rounded-2xl">
                초대 대기
              </p>
            </div>
            <div className="text-right">
              <Button>
                <span>수락</span>
              </Button>
              <Button className="ml-2 bg-white dark:bg-slate-200 hover:bg-slate-300">
                <span className="text-black dark:font-white">거절</span>
              </Button>
            </div>
          </Card>
        </Link> */}
        {/* <ItemList /> */}