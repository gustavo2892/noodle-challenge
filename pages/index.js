import React, { useState } from 'react';
import { Form, InputNumber, Button, notification } from 'antd'
import axios from 'axios';

const FormItem = Form.Item

const content = {
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  flexDirection: 'column'
}

export default function Home() {
  const [noodleTimeTotal, setNoodleTimeTotal] = useState(1);
  const [hourglassTimeA, setHourglassTimeA] = useState(1);
  const [hourglassTimeB, setHourglassTimeB] = useState(1);
  const [disabledOptions, setDisabledOptions] = useState(false);
  const [message, setMessage] = useState('Preencha todos os campos');
  
  const handleSubmit = () => {
    
    if (!noodleTimeTotal || !noodleTimeTotal || !hourglassTimeB) {
      const configNotification = {
        message: 'Verifique os dados',
        description: 'Preencha todos os campos'
      }

      notification.warning(configNotification);
      return;
    }

    if (noodleTimeTotal >= hourglassTimeA || noodleTimeTotal >= hourglassTimeB) {
      const configNotification = {
        message: 'Verifique os dados',
        description: 'O tempo das ampulhetas deve ser maior que o tempo de finalização do miojo'
      }

      notification.warning(configNotification);
      return;
    }

    setDisabledOptions(true);

    axios({
      method: 'post',
      url: '/noodles',
      data: {
        noodleTimeTotal,
        hourglassTimeA,
        hourglassTimeB
      }
    }).then((res) => {
      setMessage(`O tempo necessário para a preparação do miojo é de ${res.data} minutos`);
    }).catch((error) => {
      setMessage('Não é possível cozinhar o miojo no tempo exato com as ampulhetas disponíveis');
    })
  };

  const handleNewConsultation = () => {
    setNoodleTimeTotal(1);
    setHourglassTimeA(1);
    setHourglassTimeB(1);
    setMessage('Preencha todos os campos');
    setDisabledOptions(false);
  }

  return (
    <div style={content}>
      <div className="text-center mb-3">
        <h1 className="mb-0 text-disabled">Desafio do Miojo</h1>
      </div>
      <div className="text-center mb-5">
        <h3 className="mb-0 mt-1 text-disabled">{message}</h3>
      </div>
      <div>
        <Form layout="horizontal">
          <FormItem
            label="Tempo de finalização do miojo"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <InputNumber
              size="large"
              min={1}
              value={noodleTimeTotal}
              style={{ width: 100 }}
              name="noodleTimeTotal"
              onChange={setNoodleTimeTotal}
              disabled={disabledOptions}
            />
            <span style={{marginLeft: '3px'}}>(min)</span>
          </FormItem>

          <FormItem
            label="Tempo da primeira ampulheta"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <InputNumber
              size="large"
              min={1}
              style={{ width: 100 }}
              value={hourglassTimeA}
              name="hourglassTimeA"
              onChange={setHourglassTimeA}
              disabled={disabledOptions}
            />
            <span style={{marginLeft: '3px'}}>(min)</span>
          </FormItem>

          <FormItem
            label="Tempo da segunda ampulheta"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <InputNumber
              size="large"
              min={1}
              style={{ width: 100 }}
              value={hourglassTimeB}
              name="inputNumber"
              onChange={setHourglassTimeB}
              disabled={disabledOptions}
            />
            <span style={{marginLeft: '3px'}}>(min)</span>
          </FormItem>

          <FormItem
            style={{ marginTop: 48 }}
            wrapperCol={{ span: 8, offset: 8 }}
          >
            <Button 
              size="large" 
              type="primary" 
              onClick={handleSubmit} 
              disabled={disabledOptions}
            >
             Tempo de preparação
            </Button>
            <Button size="large" style={{ marginLeft: 8 }} onClick={handleNewConsultation} disabled={!disabledOptions}>
              Fazer nova consulta
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}
