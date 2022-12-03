import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  id_cliente = "";

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) {}

  findById(): void {
    this.service.findById(this.id_cliente).subscribe((resposta) => {
      this.cliente = resposta;
    });
  }
  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  delete(): void {
    this.service.delete(this.id_cliente).subscribe(
      (resposta) => {
        this.router.navigate(["clientes"]);
        this.service.message("Técnico deletado com sucesso!");
      },
      (err) => {
        if (err.error.error.match("possui Ordens de Serviço")) {
          this.service.message(err.error.error);
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(["clientes"]);
  }
}
