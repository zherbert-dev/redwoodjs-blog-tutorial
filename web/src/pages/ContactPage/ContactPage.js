import BlogLayout from 'src/layouts/BlogLayout'
import {
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  FieldError,
  Submit,
  useMutation,
} from '@redwoodjs/web'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`
const ContactPage = () => {
  const formMethods = useForm()
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      formMethods.reset()
      alert('Thank you for your message')
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
  }

  return (
    <BlogLayout>
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        formMethods={formMethods}
        error={error}
      >
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderBlush' }}
        />
        <Label name="name" errorClassName="error" />
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError className="error" name="name" />

        <Label name="email" errorClassName="error" />
        <TextField
          name="email"
          errorClassName="error"
          validation={{ required: true, pattern: { value: /[^@]+@[^.]+\..+/ } }}
        />
        <FieldError className="error" name="email" />

        <Label name="message" errorClassName="error" />
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError className="error" name="message" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
