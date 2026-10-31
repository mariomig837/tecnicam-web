# Guía de migración: tecnicam.es → nueva web en Netlify

Situación actual del dominio (comprobado el 29/10/2026):
- Dominio y DNS gestionados en **Hostinger** (servidores `ns1/ns2.dns-parking.com`).
- **Correo info@tecnicam.es también en Hostinger** (registros MX `mx1/mx2.hostinger.com`). NO hay que tocarlos.
- Web antigua: Zyro/Hostinger Website Builder.

Redirecciones 301 ya preparadas en `web/_redirects`:

| Página antigua | Nueva |
|---|---|
| /tienda | / |
| /mantenimiento | /#servicios |
| /politicas-y-condiciones | /privacidad.html |
| /contrato-de-servicios | / |

---

## Fase A — Antes del día del cambio
1. El cliente da el visto bueno a la web de prueba.
2. Conseguir acceso al panel de **Hostinger** del cliente (que el cliente inicie sesión o te dé acceso de colaborador).
3. Comprobar en Hostinger si el **dominio está incluido en el plan de Zyro**. Si es así, NO cancelar ese plan hasta pasar el dominio a un registro independiente (o renovar solo el dominio), o el dominio podría caducar.
4. Pedir a Claude que **quite la línea `noindex`** de `web/index.html`.

## Fase B — Día del cambio (≈30 min + espera de propagación)
1. **Netlify → Deploys**: subir la carpeta `web` actualizada (ya sin noindex).
2. **Netlify → Domain management → Add a domain**: escribir `tecnicam.es`. Añadir también `www.tecnicam.es` (Netlify redirige www → sin www automáticamente).
3. Netlify mostrará los registros DNS que hay que poner. Normalmente:
   - Registro **A** para `@` → `75.2.60.5`
   - Registro **CNAME** para `www` → `NOMBRE-DEL-SITIO.netlify.app`
   (Usar SIEMPRE los valores que muestre Netlify en ese momento.)
4. **Hostinger → Dominios → tecnicam.es → DNS / Nameservers → Administrar registros DNS**:
   - Borrar los dos registros **A** de `@` actuales y crear el nuevo A de Netlify.
   - Editar el **CNAME de `www`** para que apunte al sitio de Netlify.
   - **No tocar** los registros MX, TXT (SPF), ni nada que contenga "mail", "autodiscover", "dkim" o "_dmarc". **No cambiar los nameservers.**
5. Si Hostinger muestra un aviso de que el dominio está "conectado" al Website Builder, desconectarlo allí (sin borrar la web antigua todavía).
6. Esperar la propagación (de minutos a unas horas). Netlify activará solo el **HTTPS** (certificado gratuito); en *Domain management → HTTPS* se puede pulsar "Verify DNS configuration".

## Fase C — Comprobaciones (justo después)
- [ ] https://tecnicam.es carga la web nueva con candado.
- [ ] https://www.tecnicam.es redirige a https://tecnicam.es
- [ ] https://tecnicam.es/tienda, /mantenimiento, /politicas-y-condiciones y /contrato-de-servicios redirigen a la nueva (comprobar en https://httpstatus.io que devuelven **301**).
- [ ] Enviar un correo de prueba a info@tecnicam.es y responder desde él: el correo sigue funcionando.
- [ ] Botones de WhatsApp y formulario de cita funcionan desde el móvil.

## Fase D — Google (mismo día o al siguiente)
1. **Google Search Console** (search.google.com/search-console) con la cuenta de Google del cliente o la tuya:
   - Añadir propiedad de tipo **Dominio**: `tecnicam.es`. Verificar con el registro **TXT** que da Google, añadiéndolo en el DNS de Hostinger.
   - **Sitemaps** → enviar `sitemap.xml`.
   - **Inspección de URLs** → pegar `https://tecnicam.es/` → "Solicitar indexación".
2. **Perfil de Empresa de Google** (la ficha de Maps): confirmar que el campo "Sitio web" es `https://tecnicam.es`.
3. Durante 2–4 semanas, revisar en Search Console el informe **Páginas** y **Rendimiento**. Es normal una pequeña oscilación los primeros días.

## Fase E — Después
- Mantener el archivo `_redirects` **para siempre** (no cuesta nada).
- Cancelar el plan de Zyro **solo** cuando todo funcione y el dominio y el correo estén asegurados aparte.
- En el futuro: añadir enlaces a redes sociales y pedir reseñas a los clientes.
