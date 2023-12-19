#!/bin/bash

set -e

host="$1"
port="$2"

shift 2
cmd="$@"

until timeout 1 bash -c "cat < /dev/null > /dev/tcp/$host/$port"; do
  >&2 echo "Aguardando $host:$port..."
  sleep 1
done

>&2 echo "$host:$port está disponível - executando comando"
exec $cmd
