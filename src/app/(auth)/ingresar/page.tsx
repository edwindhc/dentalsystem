'use client';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
  username: z
    .string({
      required_error: 'El nombre de usuario es requerido',
    })
    .min(2, { message: 'Debe contener al menos 2 caracteres.' })
    .max(50, { message: 'Debe contener al maximo 50 caracteres.' }),
  password: z.string().min(2).max(50),
});

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ values });
    router.push('/panel');
  }
  return (
    <div className='flex h-screen'>
      {/* Lado izquierdo con la imagen */}
      <div className='hidden w-1/2 md:block'>
        <div
          className='h-full w-full bg-cover bg-center'
          style={{
            backgroundImage:
              'url("https://img.freepik.com/foto-gratis/dentista-sonrisa_144627-887.jpg?t=st=1718295224~exp=1718298824~hmac=8fd7b7c2ec45740aac19d6fd253b161c04be338ab758663442ee23db4a02773f&w=1380")',
            backgroundSize: '100% 100%',
          }}
        ></div>
        <div className='absolute left-0 top-0 h-full w-1/2 bg-black opacity-20'></div>
      </div>

      {/* Lado derecho con el formulario */}
      <div className='flex w-full items-center justify-center p-8 md:w-1/2'>
        <div className='w-full space-y-6 rounded-xl bg-white p-6 shadow-xl md:w-1/2'>
          <h1
            className='text-center text-2xl font-semibold'
            style={{ color: '#0d6efd' }}
          >
            Dental System
          </h1>
          <h3 className='text-2xl font-semibold'>Ingresar</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input placeholder='@usuario' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='*******' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Ingresar</Button>
            </form>
          </Form>
          <p className='text-center'>
            ¿No tienes una cuenta?{' '}
            <Link href='/registro' className='text-indigo-500 hover:underline'>
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
