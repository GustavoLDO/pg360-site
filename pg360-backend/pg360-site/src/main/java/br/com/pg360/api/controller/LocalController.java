package br.com.pg360.api.controller;

import br.com.pg360.api.model.Local;
import br.com.pg360.api.repository.LocalRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
// import io.swagger.v3.oas.annotations.parameters.RequestBody; // ESTE IMPORT FOI REMOVIDO
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/locais")
@CrossOrigin("http://localhost:5173")
@Tag(name = "Locais", description = "Endpoints para gerenciamento de locais turísticos")

public class LocalController {

    @Autowired
    private LocalRepository repository;

    @Operation(
            summary = "Criar novo local",
            description = "Registra um novo local associado a uma categoria existente.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody( // CORREÇÃO APLICADA AQUI
                    required = true,
                    content = @Content(schema = @Schema(implementation = Local.class))
            )
    )
    @PostMapping
    public ResponseEntity<Local> criar(@RequestBody Local local) { // @RequestBody do Spring
        return ResponseEntity.status(201).body(repository.save(local));
    }

    @Operation(summary = "Listar todos os locais")
    @GetMapping
    public List<Local> listarTodos() {
        return repository.findAll();
    }

    @Operation(summary = "Buscar local por ID")
    @GetMapping("/{id}")
    public ResponseEntity<Local> buscarPorId(@PathVariable Long id) {
        Optional<Local> local = repository.findById(id);
        return local.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Atualizar local existente")
    @PutMapping("/{id}")
    public ResponseEntity<Local> atualizar(@PathVariable Long id, @RequestBody Local novo) {
        return repository.findById(id)
                .map(l -> {
                    l.setNmLocal(novo.getNmLocal());
                    l.setDsLocal(novo.getDsLocal());
                    l.setEndereco(novo.getEndereco());
                    l.setLatitude(novo.getLatitude());
                    l.setLongitude(novo.getLongitude());
                    l.setHrFuncionamento(novo.getHrFuncionamento());
                    l.setCategoria(novo.getCategoria());
                    l.setImagens(novo.getImagens());
                    return ResponseEntity.ok(repository.save(l));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @Operation(summary = "Deletar local")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/imagens")
    @Operation(
            summary = "Adicionar novas imagens ao local",
            description = "Adiciona novas URLs de imagem à lista existente do local."
    )
    public ResponseEntity<Local> adicionarImagens(
            @PathVariable Long id,
            @RequestBody List<String> novasImagens) {

        return repository.findById(id)
                .map(local -> {
                    List<String> imagensAtuais = local.getImagens();
                    if (imagensAtuais == null) {
                        imagensAtuais = novasImagens;
                    } else {
                        imagensAtuais.addAll(novasImagens);
                    }

                    local.setImagens(imagensAtuais);
                    return ResponseEntity.ok(repository.save(local));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(
            summary = "Listar imagens do local",
            description = "Retorna apenas as URLs das imagens associadas ao local."
    )
    @GetMapping("/{id}/imagens")
    public ResponseEntity<List<String>> listarImagens(@PathVariable Long id) {

        Optional<Local> optLocal = repository.findById(id);

        if (optLocal.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Local local = optLocal.get();
        List<String> imagens = local.getImagens();

        if (imagens == null || imagens.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(imagens);
    }



}