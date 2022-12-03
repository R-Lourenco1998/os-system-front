import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  id_tec = "";

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl("", [Validators.minLength(3)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  telefone = new FormControl("", [Validators.minLength(11)]);

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  update(): void {
    this.service.update(this.cliente).subscribe(
      (resposta) => {
        this.router.navigate(["tecnicos"]);
        this.service.message("Técnico atualizado com sucesso!");
      },
      (err) => {
        if (err.error.error.match("já cadastrado")) {
          this.service.message(err.error.error);
        } else if (
          err.error.errors[0].message ===
          "número do registro de contribuinte individual brasileiro (CPF) inválido"
        ) {
          this.service.message("CPF inválido");
        } else {
          console.log(err);
        }
      }
    );
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe((resposta) => {
      this.cliente = resposta;
    });
  }

  cancel(): void {
    this.router.navigate(["tecnicos"]);
  }

  errorValidName() {
    if (this.nome.invalid) {
      return "O nome deve ter entre 3 e 100 caracteres";
    }
    return false;
  }
  errorValidCpf() {
    if (this.cpf.invalid) {
      return "O CPF deve ter 11 e 15 caracteres";
    }
    return false;
  }
  errorValidTelefone() {
    if (this.telefone.invalid) {
      return "O Telefone deve ter entre 11 e 18 caracteres";
    }
    return false;
  }
}
