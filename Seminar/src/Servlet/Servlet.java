package Servlet;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Servlet
 */
@WebServlet("/Servlet")
public class Servlet extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String data = req.getParameter("txt1");
		//String file = req.getParameter("fn");//.replace("kwsn", "json");
		String s="";
		try{
			File w = new File("C:/Users/Jayce/workspace1/Seminar/sensor.kwsn");
			FileWriter fw = new FileWriter(w);
			fw.write(data);
			
			fw.close();
		}
		catch(IOException ex){
			System.out.println(ex);;
		}
		PrintWriter out = resp.getWriter();	
		try{
			File w = new File("C:/Users/Jayce/workspace1/Seminar/sensor.kwsn");
			FileReader fr = new FileReader(w);
			FileReader fr1 = new FileReader(w);
			BufferedReader br = new BufferedReader(fr);
			BufferedReader br1 = new BufferedReader(fr1);
			String line;
			int max=0;
			int n=0;
			while(br.readLine()!=null){
				max++;
			}
			while((line=br1.readLine())!=null){
				if(n>max-10 && n<max-3){
					s=s+line;
				}
				n=n+1;
			}
			
			try{
				String gui= "sensor.kwsn";
				Socket socket=new Socket("localhost", 1234);
				DataOutputStream output = new DataOutputStream(socket.getOutputStream());
				DataInputStream input = new DataInputStream(socket.getInputStream());
				
				output.writeUTF(gui);
				String nhan = input.readUTF();
				out.println("\n"+nhan);
				socket.close();
			}
			catch(UnknownHostException e)
			{
				e.printStackTrace();
			}
			catch(IOException e)
			{
				out.println("Server khong duoc mo");
				e.printStackTrace();;
			}
			
		}
		catch(IOException ex){
			System.out.println(ex);;
		}
		
		
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
	}
}
