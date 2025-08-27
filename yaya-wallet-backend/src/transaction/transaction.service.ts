import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class TransactionService {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly apiUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY')!;
    this.apiSecret = this.configService.get<string>('API_SECRET')!;
    this.apiUrl = this.configService.get<string>('YAYA_API_URL')!;
  }

  /**
   * Generates authentication headers according to the official YaYa Wallet documentation.
   */
  private generateAuthHeaders(
    method: 'GET' | 'POST',
    endpoint: string,
    body: string = '',
  ) {
    const timestamp = Math.floor(Date.now() / 1000).toString();

    // 1. Create the pre-hash string: {timestamp+method+endpoint+body}
    const messageToSign = timestamp + method + endpoint + body;

    // 2. Create the HMAC-SHA256 hash using the API Secret
    const hmac = crypto
      .createHmac('sha256', this.apiSecret)
      .update(messageToSign)
      .digest(); // Digest without encoding first

    // 3. Base64 encode the hash to get the final signature
    const signature = hmac.toString('base64');

    return {
      'YAYA-API-KEY': this.apiKey,
      'YAYA-API-TIMESTAMP': timestamp,
      'YAYA-API-SIGN': signature,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  async findAll(page: number = 1) {
    const method = 'GET';
    // The endpoint must be the full path from the API documentation
    const endpoint = '/api/en/transaction/find-by-user';
    
    const headers = this.generateAuthHeaders(method, endpoint);
    const url = `${this.apiUrl}${endpoint}`;

    try {
      const response = await axios.get(url, {
        headers,
        params: { p: page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error.response?.data || error.message);
      throw error;
    }
  }

  async search(query: string) {
    const method = 'POST';
    const endpoint = '/api/en/transaction/search';
    
    // For POST requests, the body is a JSON string
    const requestBody = JSON.stringify({ query: query });

    const headers = this.generateAuthHeaders(method, endpoint, requestBody);
    const url = `${this.apiUrl}${endpoint}`;

    try {
      // Axios automatically stringifies the data object, which is what we need
      const response = await axios.post(url, { query: query }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error searching transactions:', error.response?.data || error.message);
      throw error;
    }
  }
}